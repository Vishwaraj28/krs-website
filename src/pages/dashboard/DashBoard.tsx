import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <>
      <aside>
        {isAuthenticated ? <p>Welcome, {user?.email}</p> : <p>Please log in</p>}
        <div className="flex flex-1 flex-col gap-4 p-4 bg-background">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-secondary" />
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-secondary" />
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-secondary" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="flex flex-wrap gap-4 p-4">
              <div className="w-24 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                Primary
              </div>
              <div className="w-24 h-12 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center">
                Secondary
              </div>
              <div className="w-24 h-12 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
                Muted
              </div>
              <div className="w-24 h-12 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                Accent
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
