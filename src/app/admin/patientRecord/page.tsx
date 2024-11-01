"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { api } from "~/trpc/react";
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
import { useToast } from "~/components/ui/use-toast";

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [patientData, setPatientData] = useState<any>();
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const { toast } = useToast();

  const { data, refetch } = api.patient.getUser.useQuery({
    search: search,
  });

  const updatePatientRecords = api.patient.EditPatient.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Success",
        description: "Patient records updated successfully.",
      });
    },
  });

  const handleSubmit = async () => {
    if (patientData) {
      await updatePatientRecords.mutateAsync({
        id: patientData.id,
        weight: weight,
        height: height,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 p-10">
      <Label className="text-3xl">Patient Records</Label>
      <div className="flex w-full items-start justify-start">
        <Input
          className="w-1/3"
          placeholder="search patients"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Birthdate</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.firstname}</TableCell>
              <TableCell>{data.lastname}</TableCell>
              <TableCell>{data.gender}</TableCell>
              <TableCell>
                {data.birthdate ? data.birthdate.toLocaleDateString() : "N/A"}
              </TableCell>
              <TableCell>{data.contactNumber}</TableCell>
              <TableCell>{data.weight}</TableCell>
              <TableCell>{data.height}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button onClick={() => setPatientData(data)}>Edit</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Patient Data</AlertDialogTitle>
                      <AlertDialogDescription>
                        Update the weight and height for {data.firstname}{" "}
                        {data.lastname}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                          Weight
                        </Label>
                        <Input
                          id="weight"
                          defaultValue={data.weight ?? ""}
                          onChange={(e) => setWeight(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="height" className="text-right">
                          Height
                        </Label>
                        <Input
                          id="height"
                          defaultValue={data.height ?? ""}
                          onChange={(e) => setHeight(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSubmit}>
                        Save Changes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
