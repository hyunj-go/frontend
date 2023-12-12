'use client'
import useInput from "@/app/hooks/useInput"
import { useState } from "react"

const Join = () => {  
    const userid = useInput('')
    const username = useInput('')
    const password = useInput('')
    const email = useInput('')

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

        if(!passwordError && !termError) {
            userPosts();
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
        <>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" {...userid}  placeholder="아이디를 입력해주세요"/>
                <input type="text" {...username} placeholder="이름를 입력해주세요"/>
                <input type="password" {...password} placeholder="비밀번호를 입력해주세요"/>
                <input type="password" value={passwordCheck} onChange={handlePassword} placeholder="비밀번호를 다시 입력해주세요"/>
                {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}

                <input type="text" {...email} placeholder="이메일을 입력해주세요"/>   <br/>
                <label htmlFor="term">약관동의여부</label><input id="term" type="checkbox" checked={term} onChange={handleTerm} /><br/>
                {termError && <div style = {{color:'red'}}>약관에 동의하세요.</div>}
                <button type = "submit">회원가입</button>
            </form>
        </>
    )
}

export default Join
