import Header from "../Header";
import Layout from "../Layout";
import ListItem from "../ListItem";

const SidebarUI = () => {
  return (
    <Layout>
      <div className="bg-neutral-800 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header>
          <div className="mb-2">
            <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
              <ListItem />
            </div>
          </div>
        </Header>
      </div>
    </Layout>
  );
};

export default SidebarUI;
