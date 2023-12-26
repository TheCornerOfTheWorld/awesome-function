const http = require('http')
const path = require('path')
const fse = require('fs-extra')
const Multiparty = require('multiparty')

const server = http.createServer()
const UPLOAD_DIR = path.resolve(__dirname, ".", `qiepian`)

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Headers', "*")
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end()
    return
  }
  if (req.url === '/upload') {
    const multiparty = new Multiparty.Form();

    multiparty.parse(req, async (err, fields, files) => {
      if (err) {
        console.log('err', err);
        return
      }
      const [file] = files.file;
      const [fileName] = fields.fileName
      const [chunkName] = fields.chunkName
      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }
      await fse.move(file.path, `${chunkDir}/${chunkName}`)
      res.end(JSON.stringify({
        code: 0,
        message: "切片上传成功"
      }))
    })
  }

  const resolvePost = req =>
    new Promise(res => {
      let chunk = ''
      req.on('data', data => {
        chunk += data
      })
      req.on('end', () => {
        res(JSON.parse(chunk))
      })
    })

  const pipeStream = (path, writeStream) => {
    console.log('path', path);
    return new Promise(resolve => {
      const readStream = fse.createReadStream(path)
      readStream.on('end', () => {
        fse.unlinkSync(path)
        resolve()
      })
      readStream.pipe(writeStream)
    })
  }

  const mergeFileChunk = async (filePath, fileName, size) => {
    const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
    let chunkPaths = null
    chunkPaths = await fse.readdir(chunkDir)
    chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
    const arr = chunkPaths.map((chunkPath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkPath),
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    })
    await Promise.all(arr)
  }
  if (req.url === '/merge') {
    const data = await resolvePost(req)
    const { fileName, size } = data
    const filePath = path.resolve(UPLOAD_DIR, fileName)
    await mergeFileChunk(filePath, fileName, size)
    res.end(
      JSON.stringify({
        code: 0,
        message: '文件合并成功'
      })
    )
  }

  if (req.url === '/verify') {
    const createUploadedList = async fileName =>
      fse.existsSync(path.resolve(UPLOAD_DIR, fileName))
        ? await fse.readdir(path.resolve(UPLOAD_DIR, fileName))
        : []
    const data = await resolvePost(req)
    const { fileName } = data
    const filePath = path.resolve(UPLOAD_DIR, fileName)
    console.log(filePath, 'filePath');
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      )
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
          uploadedList: await createUploadedList(`${fileName}-chunks`)
        })
      )
    }
  }
})

server.listen(3000, () => console.log('启动 3000 端口'))

// https://mp.weixin.qq.com/s/uFTHhIjHZdbPd9V-DyI6lg
// 并发控制
// 切片太多了， 一股脑去上传，肯定会对浏览器和服务器造成很大负担，所以可以控制一下并发，使用p-limit这个库，去控制一次只发一定数量的请求，进而达到并发控制的效果~

// 秒传优化
// 刚刚秒传是用文件名去判断的，这样肯定是不好的，最严谨的做法就是通过文件的hash值去判断，这是最准确的，这个hash值是需要在前端计算的，但是前端计算hash值可能有点慢，所以可以使用WebWorker去优化