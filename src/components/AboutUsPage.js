import React from "react";
import { Typography, Button, Card, CardContent, CardActions, CardMedia } from "@mui/material";
import "../css/AboutUs.css";

const AboutUs = () => {
  const instagramUrl = "https://www.instagram.com/iedc.snm/";

  const teamMembers = [
    {
      name: "Chaithanya Raj",
      role: "Mentor",
      imageUrl: "url_to_chaithanya_image",
    },
    {
      name: "Sreeraj V Rajesh",
      role: "Developer",
      imageUrl: "url_to_sreeraj_image",
    },
    {
      name: "Dheeraj K.K",
      role: "Body Desginer",
      imageUrl: "url_to_dheeraj_image",
    },
    {
      name: "Fathima ",
      role: "Core Team Member",
      imageUrl: "url_to_fathima_image",
    },
    {
      name: "Akash sasi ",
      role: "Core Team Member",
      imageUrl: "url_to_akash_image",
    },
    {
      name: "Yedhukrishnan K.D",
      role: "Core Team Member",
      imageUrl: "url_to_fathima_image",
    },
  ];

  return (
    <div style={{ padding: "16px", textAlign: "center" }}>
      <div style={{ maxWidth: 800, margin: "auto" }}>
        <Typography variant="h4" style={{ marginBottom: "16px" }}>
          Welcome to AutoBlend
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          At AutoBlend, we are passionate about crafting the perfect blend of flavors for your refreshing drinks.
          Our IoT device Mojito Mixer/Juice Mixer Machine is designed to elevate your beverage experience to a new level of excellence.
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          Our team of innovators is on a mission to create something cool and exciting. We believe that every sip
          should be a delightful adventure. With AutoBlend, mixology becomes an art, and your taste buds are in for a treat.
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          Our vision is to revolutionize the way you enjoy drinks at home or on the go. We are combining the latest
          IoT technology with top-notch design and user experience to bring you a product that not only looks great but
          also delivers on performance.
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          Whether you're hosting a party or simply craving a cool beverage, let AutoBlend be your trusted companion.
          Sit back, relax, and let our Mojito Mixer work its magic, creating the perfect blend every time.
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          Join us on this journey of taste, technology, and innovation.
        </Typography>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Cheers to the Good Life!
        </Typography>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on Instagram
          </Button>
        </div>
        <div style={{ marginTop: "32px" }}>
          <Typography variant="h4" style={{ marginBottom: "16px" }}>
            Meet Our Team
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            {teamMembers.map((member, index) => (
              <Card key={index} style={{ width: 200, margin: "16px" }}>
                <CardMedia
                  component="img"
                  alt={member.name}
                  height="140"
                  image={member.imageUrl}
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
