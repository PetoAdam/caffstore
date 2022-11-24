import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

type Props = {
  name: string;
  image: string;
};

const AboutUs: React.FC<Props> = ({ name, image }) => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia component="img" width="140" src={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const us = [
  {
    name: "Bálega Szonja",
    image:
      "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-technologist-medium-light-skin-tone.png",
  },
  {
    name: "Fábián Csenge Zita",
    image:
      "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-technologist-light-skin-tone.png",
  },
  {
    name: "Ilosvay Viktória",
    image:
      "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-technologist-medium-light-skin-tone.png",
  },
  {
    name: "Pető Ádám",
    image:
      "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/man-technologist-light-skin-tone.png",
  },
  {
    name: "Szabó Kinga Johanna",
    image:
      "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-technologist-medium-light-skin-tone.png",
  },
];

export const Welcome = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 10 }}>
      <Typography gutterBottom variant="h1" component="div">
        Creators
      </Typography>
      <Typography gutterBottom variant="h2" component="div">
        Számítógép-biztonság (VIHIMA06) - 2022
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ margin: 0 }}
      >
        {us.map((person, index) => (
          <Grid item xs={12} md={6} lg={2} key={"person" + index}>
            <AboutUs name={person.name} image={person.image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
