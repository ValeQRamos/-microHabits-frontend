import { useState } from "react";
import { updateProfileWs } from "../../services/user-admin-ws";
import { singleImageWs } from "../../services/updatePicWs";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

export default function EditProfileForm({
  props,
  setIsEdit,
  setShowName,
  setShowLastName,
  setShowUsername,
}) {
  const [firstName, setFirstName] = useState(props.pebblesUser.firstName);
  const [lastName, setLastName] = useState(props.pebblesUser.lastName);
  const [username, setUsername] = useState(props.pebblesUser.username);

  const [avatarUrl, setAvatarUrl] = useState(props.pebblesUser.avatarUrl);

  const editImage = (e) => {
    console.log(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileWs({
        firstName,
        lastName,
        username,
      });
      setShowLastName(lastName);
      setShowName(firstName);
      setShowUsername(username);
      setIsEdit((prevState) => !prevState);
    } catch (error) {
      console.log(error.response.data.errorMessage);
      alert(`ERROR : ${error.response.data.errorMessage}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit my Profile
        </Typography>
        <Avatar
          src={props.pebblesUser.avatarUrl}
          sx={{ width: 100, height: 100 }}
        />

        <Button
          variant="contained"
          component="label"
          size="small"
          color="secondary"
        >
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={editImage}
          />
        </Button>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                
                defaultValue={props.pebblesUser.firstName}
                id="firstName"
                label="First Name"
                autoFocus
                color="secondary"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                defaultValue={props.pebblesUser.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                color="secondary"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                defaultValue={props.pebblesUser.username}
                id="username"
                label="username Address"
                name="username"
                autoComplete="username"
                color="secondary"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            color="secondary"
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
