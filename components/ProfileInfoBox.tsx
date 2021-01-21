import { Box, Text } from "@chakra-ui/react";

interface IProfileBoxProps {
  name: string;
  detail: string;
}
const ProfileInfoBox: React.FC<IProfileBoxProps> = ({ name, detail }) => {
  return (
    <Box mt="1" textTransform="capitalize" key={name}>
      {name}:{" "}
      <Text fontSize="lg" fontWeight="normal" textTransform="none">
        {detail}
      </Text>
    </Box>
  );
};

export default ProfileInfoBox;
