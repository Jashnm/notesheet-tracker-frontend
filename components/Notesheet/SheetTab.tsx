import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import useSWR from "swr";
import { USER_NOTESHEETS } from "../../constants";
import { useSheetStore } from "../../store/useStore";
import { Notesheet } from "../../types";
import NotesheetBox from "./NotesheetBox";

const SheetTab = () => {
  const { userNotesheets, dispatch, loading } = useSheetStore((state) => ({
    userNotesheets: state.userNotesheets,
    dispatch: state.dispatch,
    loading: state.loading
  }));

  const { data, error } = useSWR(!loading ? "/notesheet/allsheets" : null);

  useEffect(() => {
    dispatch(USER_NOTESHEETS, data);
  }, [data]);

  if (loading) {
    <div>Loading...</div>;
  }

  let completed: Notesheet[] | undefined, all: Notesheet[] | undefined;
  if (data) {
    completed = data.map((note) => {
      if (note.status === "COMPLETED")
        return <NotesheetBox notesheet={note} creator={true} key={note.uuid} />;
    });

    all = data.map((note) => (
      <NotesheetBox notesheet={note} creator={true} key={note.uuid} />
    ));
  }

  return (
    <>
      <Tabs isFitted variant="enclosed" borderWidth="1px" rounded="md">
        <TabList mb="1em">
          <Tab fontWeight="bold">Completed</Tab>
          <Tab fontWeight="bold">All</Tab>
        </TabList>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TabPanels>
            <TabPanel>{completed}</TabPanel>
            <TabPanel>
              <p>{all}</p>
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </>
  );
};

export default SheetTab;
