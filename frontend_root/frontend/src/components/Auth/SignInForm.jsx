import { Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material";

export default function SignInForm() {
    return (
        <Stack component="form" action="/user/api/signin" method="post" spacing={2.25}>
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