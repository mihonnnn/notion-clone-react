import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import { SearchModal } from "./components/SearchModal";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { useNoteStore } from "./modules/notes/note.state";
import { noteRepository } from "./modules/notes/note.repository";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotea = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
  };

  if (currentUser == null) {
    return <Navigate replace to="/signin" />;
  }

  useEffect(() => {
    fetchNotea();
  }, []);

  return (
    <div className="h-full flex">
      {!isLoading && <SideBar onSearchButtonClicked={() => {}} />}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => {}}
          onKeywordChanged={() => {}}
          onClose={() => {}}
        />
      </main>
    </div>
  );
};

export default Layout;
