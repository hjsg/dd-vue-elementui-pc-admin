/** 权限添加 **/
function addPermission(url, params) {
    permissionCode.forEach((item) => {
        if (url == item.url) {
            params.permission_code = item.permission_code
        }
    })
    return params
}

export const permissionCode = [
    //权限菜单
    {
        url: 'v1/permission',
        permission_code: 'permission_index'
    },
    //角色列表
    {
        url: 'v1/role/index',
        permission_code: 'role_index'
    },
    //启用/停用角色
    {
        url: 'v1/role/changeStatus',
        permission_code: 'role_status'
    },
    //获取角色信息
    {
        url: 'v1/role/edit',
        permission_code: 'role_update,role_store'
    },
    //新增角色
    {
        url: 'v1/role/store',
        permission_code: 'role_store'
    },
    //编辑角色
    {
        url: 'v1/role/update',
        permission_code: 'role_update'
    },
    //删除角色
    {
        url: 'v1/role/destroy',
        permission_code: 'role_destroy'
    },
    //操作日志
    {
        url: 'v1/operationLog',
        permission_code: 'operation_index'
    },
    //会话设置展示
    {
        url: 'v1/conversation/show',
        permission_code: 'conversation_show'
    },
    //会话设置提交
    {
        url: 'v1/conversation/store',
        permission_code: 'conversation_store'
    },
    //离线留言展示
    {
        url: 'v1/offline/show',
        permission_code: 'offline_show'
    },
    //离线留言提交
    {
        url: 'v1/offline/store',
        permission_code: 'offline_store'
    },
    //邀请评论展示
    {
        url: 'v1/evaluate/show',
        permission_code: 'evaluate_show'
    },
    //邀请评论提交
    {
        url: 'v1/evaluate/store',
        permission_code: 'evaluate_store'
    },
    //人员列表
    {
        url: 'v1/customer/index',
        permission_code: 'customer_index'
    },
    //人员列表信息
    {
        url: 'v1/customer/info',
        permission_code: 'customer_store,customer_update'
    },
    //人员列表添加
    {
        url: 'v1/customer/store',
        permission_code: 'customer_store'
    },
    //人员列表编辑
    {
        url: 'v1/customer/update',
        permission_code: 'customer_update'
    },
    //人员列表删除
    {
        url: 'v1/customer/delete',
        permission_code: 'customer_delete'
    },
    //留言列表
    {
        url: 'v1/message',
        permission_code: 'message_index'
    },
    //留言信息
    {
        url: 'v1/message/info',
        permission_code: 'message_index'
    },
    //留言编辑
    {
        url: 'v1/message/update',
        permission_code: 'message_update'
    },
    //历史记录
    {
        url: 'v1/history',
        permission_code: 'history_index'
    },
    //历史记录-查看
    {
        url: 'v1/history/info',
        permission_code: 'history_index'
    },
    //企业信息
    {
        url: 'v1/company/info',
        permission_code: 'company_update'
    },
    //企业-编辑
    {
        url: 'v1/company/update',
        permission_code: 'company_update'
    },
]

export default {
    addPermission
}
