
import { Button, Form, Input, Dialog, Image } from 'antd-mobile'
import http from '@/api/request'
import { useState, useEffect } from 'react'
import {
    useNavigate,
    useLocation,
  } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
let msgTimer = null
function Login(props) {
    const NavigateTo = useNavigate()
    const [form] = Form.useForm()
    const [state, setState] = useState({
        codeText: '获取验证码'
    });
    const [disabled, setDisabled] = useState(false)
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
            if (res.code === 200) {
                props.onSetUser(res).then(() => {
                    NavigateTo('/my')
                })
            }
        })
    }
    const getCountDown = (t) => {
        t = (!t || t === null) ? 59 : ((new Date(parseInt(t)).getTime() - new Date().getTime()) / 1000).toFixed(0)
        if (t < 0 || isNaN(t)) return
        t = t < 10 ? '0' + t : t
        setDisabled(true)
        setState({
            ...state,
            codeText: t + 's后获取'
        })
        msgTimer = setInterval(() => {
            t--
            t = t < 10 ? '0' + t : t
            setState({
                ...state,
                codeText: t + 's后获取'
            })
            localStorage.setItem('countDown', new Date().getTime() + parseInt(t) * 1000)
            if (parseInt(t) < 1) {
                t = 59
                clearInterval(msgTimer)
                localStorage.removeItem('countDown')
                setDisabled(false)
                setState({
                    ...state,
                    codeText: '获取验证码'
                })
            }
        }, 1000);
    }
    useEffect(() => {
        let t = localStorage.getItem('countDown')
        t && t !== null && getCountDown(t)
        return () => {
            clearInterval(msgTimer)
        }
    }, [])
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
                getCountDown(localStorage.getItem('countDown') || '')
            }
        })
        // /captcha/sent
    }
    return <div className='flexbox-v align-c'>
        <>
            <Form
            layout='horizontal'
            form={form}
            footer={
                <Button block color='primary' onClick={onSubmit} size='large'>
                  提交
                </Button>
              }
            >
                <Form.Header>
                    {/* /logo512.png */}
                    <Image onClick={() => NavigateTo('/')} style={{height: '2rem', width: '2rem', margin: '2rem auto 2rem'}} src={'/logo512.png'} />
                </Form.Header>
                <Form.Item label='手机号' style={{textAlign: 'right'}} name='phone'>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label='短信验证码'  style={{textAlign: 'right'}} name={'captcha'} extra={<Button disabled={disabled} onClick={handCaptcha} color='primary' fill='none'>{state.codeText}</Button>}>
                    <Input placeholder='请输入' />
                </Form.Item>
            </Form>
        </>
    </div>
  }
export default connect(mapStateToProps, mapDispatchToProps)(Login)