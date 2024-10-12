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
  const { data, refetch } = api.walkin.getWalkin.useQuery({ search: search });
  const [walkinData, setWalkinData] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const updateDoctors = api.walkin.EditWalkin.useMutation({
    onSuccess: async () => {
      await refetch();
      await toast({
        title: "Success",
        description: "Doctor records updated successfully.",
        duration: 1000,
      });
      setWalkinData(null);
    },
  });

  const handleSubmit = async () => {
    if (walkinData) {
      await updateDoctors.mutateAsync({
        id: walkinData.id,
        firstname: walkinData.firstname,
        lastname: walkinData.lastname,
        age: walkinData.age,
        contact: walkinData.contact,
        address: walkinData.address,
        height: walkinData.height,
        weight: walkinData.weight,
        gender: walkinData.gender, // Use the selected gender value here
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setWalkinData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddDoctors = () => {
    setWalkinData(null);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 p-10">
      <Label className="text-3xl">Walk-in Records</Label>
      <div className="flex w-full items-start justify-between">
        <Input
          className="w-1/3"
          placeholder="Search doctors"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-black" onClick={handleAddDoctors}>
          Add Wak-in
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((walkin) => (
            <TableRow key={walkin.id}>
              <TableCell>{walkin.firstname}</TableCell>
              <TableCell>{walkin.lastname}</TableCell>
              <TableCell>{walkin.age}</TableCell>
              <TableCell>{walkin.gender}</TableCell>
              <TableCell>{walkin.contact}</TableCell>
              <TableCell>{walkin.address}</TableCell>
              <TableCell>{walkin.height}</TableCell>
              <TableCell>{walkin.weight}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setWalkinData(walkin);
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
              {walkinData ? "Edit Doctor Information" : "Add New Doctor"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {walkinData
                ? "Make changes to the doctor's information here. Click save when you're done."
                : "Enter the details for the new doctor. Click save when you're done."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                value={walkinData?.firstname || ""}
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
                value={walkinData?.lastname || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                value={walkinData?.age || ""}
                onChange={handleInputChange}
                type="number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <select
                id="gender"
                name="gender"
                value={walkinData?.gender || ""}
                onChange={handleInputChange}
                className="col-span-3 rounded-md border p-2"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={walkinData?.contact || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={walkinData?.address || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="height" className="text-right">
                Height
              </Label>
              <Input
                id="height"
                name="height"
                value={walkinData?.height || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight
              </Label>
              <Input
                id="weight"
                name="weight"
                value={walkinData?.weight || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <AlertDialogFooter className="flex items-center justify-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              {walkinData ? "Save Changes" : "Add Doctor"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
