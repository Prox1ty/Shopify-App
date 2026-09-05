import { useState } from "react";
import { Box, Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import SignInForm from "../components/Auth/SignInForm.jsx";
import SignUpForm from "../components/Auth/SignUpForm.jsx";

export default function UserRegistration() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<Box
			sx={{
				minHeight: "calc(100vh - 128px)",
				display: "flex",
				alignItems: "center",
				py: { xs: 5, md: 9 },
				background: "linear-gradient(135deg, #eef6ff 0%, #fff7f1 100%)"
			}}
		>
			<Container maxWidth="sm">
				<Paper
					elevation={0}
					sx={{
						p: { xs: 3, sm: 5 },
						border: "1px solid #e4e7ec",
						borderRadius: 4,
						boxShadow: "0 20px 50px rgba(25, 118, 210, 0.12)"
					}}
				>
					<Stack spacing={3}>
						<Box textAlign="center">
							<Typography variant="overline" color="primary" fontWeight={800}>
								Welcome to My Store
							</Typography>
							<Typography variant="h3" fontWeight={900} sx={{ mt: 1, letterSpacing: "-0.03em" }}>
								{activeTab === 0 ? "Create your account" : "Welcome back"}
							</Typography>
							<Typography color="text.secondary" sx={{ mt: 1 }}>
								{activeTab === 0
									? "Save your favorite builds and check out faster."
									: "Sign in to continue shopping your favorite gear."}
							</Typography>
						</Box>

						<Tabs
							value={activeTab}
							onChange={(_, value) => setActiveTab(value)}
							variant="fullWidth"
							aria-label="Account access"
						>
							<Tab label="Sign up" />
							<Tab label="Sign in" />
						</Tabs>

						{activeTab === 0 ? <SignUpForm /> : <SignInForm />}
					</Stack>
				</Paper>
			</Container>
		</Box>
	);
}
