'use client'
import { signIn } from 'next-auth/react';
import useInput from "@/app/hooks/useInput"
import { useState } from "react"

const Login = () => {
    const email = useInput('')
    const password = useInput('')
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(email.value && password.value) {
            // signIn 함수를 사용하여 자체 로그인 요청
            //const result = await signIn('credentials', {
            signIn('credentials', {
                email: email.value,
                password: password.value,
                redirect: true,
                callbackUrl:"/",
            });
        }
    
      };

    const handleBlur = (e) => {
        const { id } = e.target;
        setTouched(
            ...touched,
            [id] : false
        )
    }

    return(
        <div className="wrapper">
            <div className="input-form sm">
                <div className="container">
                    <div className="row">
                        <div className="columns twelve text">
                            <h2>Login</h2>
                            <p></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} id="form_area" name="Login Form">
                        <div className="input-container full">
                            <input type="text" id="email" name="email" {...email} placeholder="이메일을 입력해주세요" onblur={handleBlur}/>
                            {touched.email && email.value==='' && <div className="error-msg">이메일을 입력해주세요.</div>}
                        </div>
                        <div className="input-container full">
                            <input type="password" id="password" name="password" {...password} placeholder="비밀번호를 입력해주세요" onblur={handleBlur}/>
                            {touched.password && password.value==='' && <div className="error-msg">비밀번호를 입력해주세요.</div>}
                        </div>
                        <button type="submit" id="submit">로그인</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
