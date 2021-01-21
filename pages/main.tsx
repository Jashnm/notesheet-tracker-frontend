import { Box, Flex, Heading } from "@chakra-ui/react";
// import axios from "axios";
import { useEffect, useState } from "react";
import NotesheetBox from "../components/Notesheet/NotesheetBox";
import NotesheetForm from "../components/Notesheet/NotesheetForm";
import useSWR from "swr";

import { useRouter } from "next/dist/client/router";
import { useSheetStore, useUserStore } from "../store/useStore";
import { GET_LIVE_NOTESHEETS } from "../constants";
import SheetTab from "../components/Notesheet/SheetTab";
import NewSheetDrawer from "../components/NewSheetDrawer";
import CustomAltert from "../components/CustomAltert";
const main = () => {
  // const { authenticated, loading } = useAuthState();

  const router = useRouter();

  const { dispatch, loading } = useSheetStore((state) => ({
    notesheets: state.notesheets,
    dispatch: state.dispatch,
    loading: state.loading
  }));
  // const { loading, authenticated } = useUser();
  const { data: notesheets, error } = useSWR(
    !loading ? "/user/notesheets" : null
  );

  // useEffect(() => {
  //   dispatch(GET_LIVE_NOTESHEETS, data);
  // }, [data]);

  if (loading) {
    <div>Loading...</div>;
  }

  return (
    <>
      <Flex
        mt="4rem"
        direction={["column", "column", "row"]}
        justify="space-around"
        mx="6"
      >
        <Box w={["100%", "90%", "49%"]}>
          <Heading as="h3" fontSize="2xl" p="3" pb="1">
            Currently Live Notesheets
          </Heading>
          {!notesheets ? (
            <div>Loading Notesheets...</div>
          ) : notesheets.length !== 0 ? (
            <Box>
              {notesheets.map((notesheet) => (
                <NotesheetBox
                  notesheet={notesheet}
                  key={notesheet.uuid}
                  creator={false}
                />
              ))}
            </Box>
          ) : (
            <Box p="3">No Notesheet available.</Box>
          )}
        </Box>
        <Box w={["100%", "90%", "40%"]} mt={["2", "2", "0"]}>
          <SheetTab />
          {/* <Heading p="3" pb="1" fontSize="2xl">
          Create New Notesheet
          </Heading>
        <NotesheetForm /> */}
        </Box>
      </Flex>
    </>
  );
};

export default main;
