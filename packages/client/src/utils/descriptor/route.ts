function Get(routePath: string) {
  return function (target: any, key: string, descriptor: any) {
    const originalMethod = descriptor.value // 保存原始方法

    descriptor.value = function () {
      // 在原始方法执行前加入逻辑
      console.log('处理 Get 请求，路由路径: ' + routePath)

      // 执行原始方法
      const result = originalMethod.apply(this, arguments)

      // 在原始方法执行后加入逻辑
      console.log('Get 请求处理完成')

      return result
    }

    return descriptor
  }
}
function Post(routePath: string) {
  return (target: any, key: string, descriptor: any) => descriptor
}

function Role(permissions) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value // 保存原始方法

    descriptor.value = function () {
      // 在原始方法执行前进行权限验证
      const user = getCurrentUser() // 获取当前用户信息

      // 检查用户是否拥有所需权限
      const hasPermission = checkUserPermissions(user, permissions)

      if (!hasPermission) {
        // 如果用户没有权限，则抛出错误或执行其他处理
        throw new Error('无权限访问该接口')
      }

      // 执行原始方法
      const result = originalMethod.apply(this, arguments)

      return result
    }

    return descriptor
  }
}

class Doc {
  @Get('doc')
  @Role('admin')
  async findDocById(id) {}

  @Post('doc')
  @Role('superAdmin')
  async createDoc(data) {}
}
