<template>
    <div class="account">
        <div class="control-box">
            <el-button type="primary" class="permission" data-py="xjzh" @click="dialogFormAddUser=true">新建账号</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="trueName" label="真实姓名" />
            <el-table-column prop="roleNames" label="角色" />
            <el-table-column prop="type" label="操作">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row)" class="permission" data-py="sczh" type="text" size="small">删除账号</el-button>
                    <el-button @click="dialogResetPassword=true, id = scope.row.id" class="permission" data-py="czmm" type="text" size="small">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增用户" :visible.sync="dialogFormAddUser" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="form" :rules="rules" ref="addUserForm">
                <input type="password" name="password1" autocomplete="off" style="position: fixed; top: -999px; left: -999px"/>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="form.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="trueName">
                    <el-input v-model="form.trueName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
                    <el-select v-model="form.roles" placeholder="请选择角色">
                        <el-option v-for="(role, index) in roles" :key="index" :label="role.name" :value="role.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddUser = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="dialogResetPassword" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-input label="新密码" type="password" v-model="password" auto-complete="off"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogResetPassword = false, id=0, password=''">取 消</el-button>
                <el-button type="primary" @click="resetPassword">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { AdminInt } from "./../../../api/admin"

export default {
    data() {
        return {
            dialogFormAddUser: false,
            dialogResetPassword: false,
            formLabelWidth: '120px',
            password: '',
            id: 0,
            tableData: [],
            roles: [],
            form: {
                userName: '',
                trueName: '',
                password: '',
                roles: ''
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                trueName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                roles: [{ required: true, message: '请选择角色', trigger: 'blur' }]
            }
        }
    },
    mounted() {
        this.list()
        this.rolesList()
    },
    methods: {
        list() {
            AdminInt.getManagerUsersList({}, res => {
                this.tableData = JSON.parse(res.data)
            })
        },
        rolesList() {
            AdminInt.getManagerRolesList({}, res => {
                this.roles = JSON.parse(res.data)
            })
        },
        resetPassword() {
            if(!this.password) {
                this.$message.warning('新密码不能为空')
                return
            }
            AdminInt.resetManageUserPwd({password: this.password, id: this.id}, res => {
                if (res.status === 200) {
                    this.dialogResetPassword = false
                    this.password =''
                    this.id = 0
                    this.$message.success('修改成功')
                } else 
                    this.$message.success('修改失败')
            })
        },
        del(row) {
            AdminInt.deleteManagerUser({id: row.id}, res => {
                if (res.status === 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000,
                        onClose() {
                            window.location.reload()
                        }
                    })
                } else 
                    this.$message.success('删除失败')
            })
        },
        closeDialog() {
            this.dialogFormAddUser = false
            this.resetForm()
        },
        addUser() {
            this.$refs.addUserForm.validate((valid) => {
                if (valid) {
                    AdminInt.createManageUser(this.form, res => {
                        if (res.status === 200) {
                            this.closeDialog()
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                duration: 1000,
                                onClose() {
                                    window.location.reload()
                                }
                            })
                        } else 
                            this.$message.success('保存失败')
                    })
                }
            });
        },
        resetForm() {
            this.$refs.addUserForm.resetFields()
        }
    } 
}
</script>
<style lang="scss" scoped>

</style>


