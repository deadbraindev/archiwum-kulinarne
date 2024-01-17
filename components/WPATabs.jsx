import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function WPATabs() {
  return (
    <section className="addAppContainer">
      <h1> uzyj aplikacji mobilnej</h1>
      <Tabs>
        <TabList>
          <Tab>iOS/ipadOS</Tab>
          <Tab>macOS</Tab>
          <Tab>windows</Tab>
          <Tab>android</Tab>
        </TabList>

        <TabPanel>
          <h2>aplikacja dla urządzeń iphone i ipad</h2>
        </TabPanel>
        <TabPanel>
          <h2>aplikacja dla urządzeń z systemem macOS sonoma</h2>
        </TabPanel>
        <TabPanel>
          <h2>aplikacja dla wnidows</h2>
        </TabPanel>
        <TabPanel>
          <h2>aplikacja dla adnroid</h2>
        </TabPanel>
      </Tabs>
    </section>
  );
}
