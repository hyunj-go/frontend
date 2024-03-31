'use client'
import useInput from "@/app/hooks/useInput"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Join = () => {  
    const userid = useInput('')
    const username = useInput('')
    const password = useInput('')
    const email = useInput('')
    const router = useRouter()

    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)

    const handlePassword = (e) => {
        const {value} = {...e.target}
        setPasswordError(password.value !== value) //같으면 false 다르면 true
        setPasswordCheck(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.value !== passwordCheck){
            setPasswordError(true)
            return 0;    
        }else {
            setPasswordError(false)
        }

        if(!term){
            setTermError(true)
            return 0;
        }
        console.log(userid.value, password.value,)

        if(!passwordError && !termError && userid.value && password.value && email.value && username.value) {
            userPosts();
        }else{
            alert('필수 입력사항을 입력해주세요.');
        }
    }

    const [term, setTerm] = useState(false) //약관 동의여부
    const [termError, setTermError] = useState(false)

    const handleTerm = e =>{
        console.log('handleTerm들어옴')
        setTermError(e.target.checked !== true) //체크가 뜨면 
        //true !==true  =>false 문
        //false
        setTerm(e.target.checked)
    }

    // const resp = await fetch(`${process.env.API_URL}/api/`);
    // const aboutus = await resp.json();
    // const story = aboutus.data;
    const userPosts = () => {
        const userData = {
            userid: userid.value,
            username: username.value,
            email: email.value,
            password: password.value,
        };
        fetch(`${process.env.API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registration successful', data);
        })
        .catch(error => {
            console.error('Error during registration', error);
        });
    }

    return(
        <div className="wrapper">
            <div className="input-form lg sm">
                <div className="container">
                    <div className="row">
                        <div className="columns twelve text">
                            <h2>Join</h2>
                            <p></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} id="form_area" name="Join Form">
                        <div className="input-container full">
                            <input type="text" {...userid}  placeholder="아이디를 입력해주세요"/>   
                            {userid.value==='' && <div className="error-msg">아이디를 입력해주세요.</div>}
                        </div>
                        <div className="input-container full">
                            <input type="text" {...username} placeholder="이름을 입력해주세요"/>
                            {username.value==='' && <div className="error-msg">이름을 입력해주세요.</div>}
                        </div>
                        <div className="input-container full">
                            <input type="password" {...password} placeholder="비밀번호를 입력해주세요"/>
                            {!password.value && <div className="error-msg">비밀번호를 입력해주세요.</div>}
                        </div>
                        <div className="input-container full">
                            <input type="password" value={passwordCheck} onChange={handlePassword} placeholder="비밀번호를 다시 입력해주세요"/>
                            {passwordError && <div className="error-msg">비밀번호가 일치하지 않습니다.</div>}
                        </div>
                        <div className="input-container full">
                            <input type="text" {...email} placeholder="이메일을 입력해주세요"/>
                            {!email.value && <div className="error-msg">이메일을 입력해주세요.</div>}
                        </div>
                        <div className="input-container full checkbox">
                            <input id="term" type="checkbox" checked={term} onChange={handleTerm} />
                            <label htmlFor="term"><span>약관동의여부</span></label>
                            {termError && <div className="error-msg">약관에 동의하세요.</div>}
                        </div>
                        
                        <button type="submit" id="submit">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join
