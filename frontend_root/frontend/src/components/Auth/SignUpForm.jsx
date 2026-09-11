import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUpForm() {
     const navigate = useNavigate();
    const [hidePassword, setHidePassword] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('http://localhost:8000/user/api/signup', {
                method: 'POST',
                body: new URLSearchParams(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Sign up failed');
            }

            const data = await response.json();
            console.log("Sign up successful. ", data);
        } catch(error) {
            console.error("Error while signing up.", error);
        }
    }

    return (
        <Stack component="form" onSubmit={handleSubmit} spacing={2.25}>
            <TextField
                label="Full name"
                name="fullName"
                autoComplete="name"
                required
                fullWidth
            />
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
                type={hidePassword ? 'password' : 'text'}
                autoComplete="new-password"
                required
                fullWidth
                helperText="Use at least 8 characters."
                inputProps={{ minLength: 8 }}
            />
            <FormControlLabel

                control={<Checkbox color="primary" onClick={() => { setHidePassword(!hidePassword) }} />}
                label={<Typography variant="body2">Show password</Typography>}
            />
            <FormControlLabel
                control={<Checkbox required color="primary" />}
                label={<Typography variant="body2">I agree to the terms and privacy policy.</Typography>}
            />
            <Button type="submit" variant="contained" size="large" sx={{ py: 1.4, borderRadius: 2, fontWeight: 700 }}>
                Create account
            </Button>
        </Stack>
    );
}