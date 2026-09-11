import { Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function SignInForm() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault(); 

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('http://localhost:8000/user/api/signin', {
                method: 'POST',
                body: new URLSearchParams(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Sign in failed');
            }

            const data = await response.json();
            console.log('Signed in successfully:', data);
            navigate('/');


        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} spacing={2.25}>
            <TextField
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                fullWidth
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                    control={<Checkbox name="remember" color="primary" />}
                    label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link href="#" underline="hover" variant="body2" onClick={(event) => event.preventDefault()}>
                    Forgot password?
                </Link>
            </Stack>
            <Button type="submit" variant="contained" size="large" sx={{ py: 1.4, borderRadius: 2, fontWeight: 700 }}>
                Sign in
            </Button>
        </Stack>
    );
}