"use client";

import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";

export default function DoctorRecords() {
  const [search, setSearch] = useState("");
  const { data, refetch } = api.doctor.getDoctor.useQuery({ search: search });
  const [doctorData, setDoctorData] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const updateDoctors = api.doctor.EditDoctor.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Success",
        description: "Doctor records updated successfully.",
        duration: 1000,
      });
      setDoctorData(null);
    },
  });

  const updateDoctorstatus = api.doctor.EditDoctorStatus.useMutation({
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Doctor status updated successfully.",
        duration: 1000,
      });
      await refetch();
    },
  });

  const handleSubmit = async () => {
    if (doctorData) {
      await updateDoctors.mutateAsync({
        id: doctorData.id,
        username: doctorData.username,
        firstname: doctorData.firstname,
        lastname: doctorData.lastname,
        description: doctorData.description,
        specialty: doctorData.specialty,
      });
    }
  };

  const updateDoctorStatus = async (doctor: any) => {
    if (doctor) {
      await updateDoctorstatus.mutateAsync({
        id: doctor.id,
        status: !doctor.status,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddDoctors = () => {
    setDoctorData(null);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 p-10">
      <Label className="text-3xl">Doctor Records</Label>
      <div className="flex w-full items-start justify-between">
        <Input
          className="w-1/3"
          placeholder="Search doctors"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-black" onClick={handleAddDoctors}>
          Add Doctor
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.username}</TableCell>
              <TableCell>{doctor.firstname}</TableCell>
              <TableCell>{doctor.lastname}</TableCell>
              <TableCell>{doctor.description}</TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>
                <Button
                  onClick={() => updateDoctorStatus(doctor)}
                  className={`${doctor.status ? "bg-green-600" : "bg-red-400"} hover:bg-red-500`}
                >
                  {doctor.status ? "Active" : "Inactive"}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setDoctorData(doctor);
                    setOpenDialog(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* AlertDialog for Adding/Editing Doctor */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger asChild>
          {/* Trigger button is handled via state change, no need for additional trigger */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {doctorData ? "Edit Doctor Information" : "Add New Doctor"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {doctorData
                ? "Make changes to the doctor's information here. Click save when you're done."
                : "Enter the details for the new doctor. Click save when you're done."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={doctorData?.username || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                value={doctorData?.firstname || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastname"
                name="lastname"
                value={doctorData?.lastname || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={doctorData?.description || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">
                Specialty
              </Label>
              <Input
                id="specialty"
                name="specialty"
                value={doctorData?.specialty || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <AlertDialogFooter className="flex items-center justify-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              {doctorData ? "Save Changes" : "Add Doctor"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
