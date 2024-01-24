import 'intro.js/introjs.css'
import introJs from 'intro.js'

const intro = introJs()

intro.setOption({
  nextLabel: '下一个',
  prevLabel: '上一个',
  skipLabel: '跳过',
  doneLabel: '立即体验',
  hidePrev: true,
  hideNext: true,
  exitOnOverlayClick: false,
  showStepNumbers: false,
  disableInteraction: true,
  showBullets: false,
})

export default intro