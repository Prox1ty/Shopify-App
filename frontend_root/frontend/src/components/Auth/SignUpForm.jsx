import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
export default function SignUpForm() {
     
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <Stack component="form" action="/user/api/signup" method="post" spacing={2.25}>
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