import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function DashboardModal() {
  return (
    <Dialog>
      {/* trigger button */}
      <DialogTrigger asChild>
        <Button>Dashboard</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dashboard</DialogTitle>
          <DialogDescription>{/* modal content */}</DialogDescription>
        </DialogHeader>
        <div className="p-2">
          <p>Hello! I’m inside the dashboard modal 🎉</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
