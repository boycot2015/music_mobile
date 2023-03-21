
import { Button, Form, Input, Dialog, Image } from 'antd-mobile'
import http from '@/api/request'
import config from '@/config'
import {
    useNavigate,
    useLocation,
  } from 'react-router-dom'
function Login() {
    const NavigateTo = useNavigate()
    const [form] = Form.useForm()
    const onSubmit = () => {
        const values = form.getFieldsValue()
        if (!values.phone) {
            Dialog.alert({
                content: '请输入手机号',
            })
            return
        }
        if (!values.captcha) {
            Dialog.alert({
                content: '请输入验证码',
            })
            return
        }
        // Dialog.alert({
        //   content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        // })
        let data = {
            cellphone: values.phone,
            captcha: values.captcha
        }
        // /register/anonimous 游客登录
        // /login/cellphone 验证码登录
        http('get', '/register/anonimous', values).then(res => {
            // {code: 200, data: true}
            // console.log(res, 'res');
            if (res.code === 200) {
                localStorage.setItem(config.appPrefix + '_cookie', res.cookie)
                NavigateTo('/userCenter')
            }
        })
    }
    const handCaptcha = () => {
        const values = form.getFieldsValue()
        if (!values.phone) {
            Dialog.alert({
                content: '请输入手机号',
            })
            return
        }
        http('get', '/captcha/sent', values).then(res => {
            // {code: 200, data: true}
            if (res) {
                console.log(res, 'res');
            }
        })
        // /captcha/sent
    }
    return <div className='flexbox-v align-c'>
        <>
            <Form
            layout='horizontal'
            form={form}
            mode='card'
            footer={
                <Button block color='primary' onClick={onSubmit} size='middle'>
                  提交
                </Button>
              }
            >
                <Form.Header>
                    <Image onClick={() => NavigateTo('/')} style={{height: '2rem', width: '2rem', margin: '2rem auto 2rem'}} src={'/logo512.png'} />
                </Form.Header>
                <Form.Item label='手机号' name='phone'>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label='短信验证码' name={'captcha'} extra={<Button onClick={handCaptcha} color='primary' fill='none'>发送验证码</Button>}>
                    <Input placeholder='请输入' />
                </Form.Item>
            </Form>
        </>
    </div>
  }
export default Login