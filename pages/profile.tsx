import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  VStack,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Footer from "../components/Footer";
import ProfileInfoBox from "../components/ProfileInfoBox";
import { useUserStore } from "../store/useStore";
import useUser from "../utils/useUser";

const profile = () => {
  // const { authenticated, loading } = useAuthState();
  const { authenticated, loading, user } = useUserStore((state) => ({
    authenticated: state.authenticated,
    loading: state.loading,
    user: state.user
  }));

  // const { data: user } = useSWR(authenticated ? "/user/profile" : null);

  // const dispatch = useAuthDispatch();

  const router = useRouter();

  // const { user, loading, authenticated } = useUser();

  if (loading && authenticated) {
    return <div>Loading...</div>;
  }
  // if (authenticated && user) {
  return (
    <>
      {user && (
        <Container maxW="1020px" mt="8">
          <Heading textAlign={["center", "unset"]}>
            {user.name}'s Profile
          </Heading>
          <Flex mt="6" wrap="wrap" mx={["1", "0"]}>
            <Box
              maxW={["380px", "300px"]}
              w="100%"
              textAlign={["center", "unset"]}
              mx="1"
              mt="2"
              borderRight={["0px", "0px", "1px"]}
              borderRightColor={["", "", "gray.100"]}
              px="2"
            >
              <Avatar size="2xl" src="" name={user.name} />
              <VStack
                mt="2"
                spacing={4}
                align="stretch"
                fontSize="xl"
                fontWeight="semibold"
              >
                <ProfileInfoBox name="Name" detail={user.name} />
                <ProfileInfoBox name="Email" detail={user.email} />
              </VStack>
            </Box>
            <Box px="2" ml={["0", "2"]} mt={["5", "2"]}>
              <VStack
                spacing={4}
                align="stretch"
                fontSize="xl"
                fontWeight="semibold"
              >
                <ProfileInfoBox name="Role" detail={user.role} />
                {user.role === "Lecturer" || user.role === "HOD" ? (
                  <>
                    <ProfileInfoBox name="Dept" detail={user.dept.name} />
                    <ProfileInfoBox
                      name="School"
                      detail={user.dept.school.name}
                    />
                  </>
                ) : user.role === "DEAN" ? (
                  <ProfileInfoBox name="School" detail={user.school.name} />
                ) : null}
              </VStack>
            </Box>
          </Flex>
        </Container>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default profile;
