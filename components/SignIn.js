import { Button } from '@material-ui/core';
import { useRouter } from 'next/router'

export default function SignIn() {
    const router = useRouter()
    const handleSignIn = () => {
        router.push('/api/bungieAuth?origin=' + router.pathname)        
    };
    return (
        <Button onClick={handleSignIn} variant="outlined" color="secondary">Sign In</Button>
    );
}
/*
        var win = window.open('/api/bungieAuth');
        var timer = setInterval(function () {
            if (win.closed) {
                clearInterval(timer);
                let token = null;
                token = window.localStorage.getItem('bungieToken');
                if (token) {
                    location.reload()
                }
                else {
                    alert('Login failed');
                }
            }
        }, 1000);
        */