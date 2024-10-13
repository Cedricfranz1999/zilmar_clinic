"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CalendarIcon, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const { toast } = useToast();
  const [appointmentId, setAppointmentId] = useState<string>();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { data: appointment, refetch } =
    api.appointment.getAllAppointment.useQuery();
  const { data: activeDoctor } = api.doctor.getActiveDoctor.useQuery();
  const { data: patientLogin } = api.patient.getPatientLogin.useQuery({});

  console.log("12345", patientLogin);

  const updateDoctors = api.appointment.AddAppointment.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Success",
        description: "Doctor records updated successfully.",
        duration: 1000,
      });
    },
  });

  const deleteAppointment = api.appointment.deleteAppointment.useMutation({
    onSuccess: async () => {
      await refetch();
      await toast({
        title: "Success",
        description: "delete appointment updated successfully.",
        duration: 1000,
      });
    },
  });

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return {
      formattedDate: format(date, "MMMM d, yyyy"),
      formattedTime: format(date, "h:mm a"),
    };
  };

  console.log("appointment id ", appointmentId);

  const handleAddAppointment = async (event: any) => {
    event.preventDefault();
    const form = event.target;

    const newAppointment = {
      date: new Date(`${form.date.value}T${form.time.value}`),
      patientId: patientLogin?.id as string,
      description: form.description.value,
      doctorId: form.doctor.value,
    };

    if (appointment) {
      await updateDoctors.mutateAsync(newAppointment);
    }
    setAddDialogOpen(false);
  };

  const handleEditAppointment = async (event: any) => {
    event.preventDefault();
    const form = event.target;

    const newAppointment = {
      id: appointmentId,
      date: new Date(`${form.date.value}T${form.time.value}`),
      patientId: patientLogin?.id as string,
      description: form.description.value,
      doctorId: form.doctor.value,
    };

    console.log("Editing Appointment:", newAppointment);
    // Add your API call here to update the appointment

    setEditDialogOpen(false); // Close dialog after saving
    if (appointment) {
      await updateDoctors.mutateAsync(newAppointment);
    }
    setAddDialogOpen(false);
  };

  const handleDelete = async () => {
    if (appointment) {
      await deleteAppointment.mutateAsync({ id: appointmentId as string });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Appointment Management</h1>

      <div className={`space-y-6 ${appointment?.length === 0 ? "hidden" : ""}`}>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-lg font-semibold">
            Appointment List
          </Badge>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Add Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddAppointment}>
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new appointment here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="doctor" className="text-right">
                      Doctor
                    </Label>
                    <Select name="doctor" required>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>List of doctors</SelectLabel>
                          {activeDoctor?.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.firstname} {doctor.lastname}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button disabled={updateDoctors.isPending} type="submit">
                    Save Appointment
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableCaption>A list of your appointments.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Appointment Description</TableHead>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointment?.map((appointment) => {
                  const { formattedDate, formattedTime } = formatDate(
                    appointment.appointmentTime,
                  );
                  return (
                    <TableRow key={appointment?.id}>
                      <TableCell className="font-medium">
                        {formattedDate}
                      </TableCell>
                      <TableCell>{formattedTime}</TableCell>
                      <TableCell>
                        {appointment.appointmentDescription}
                      </TableCell>
                      <TableCell>
                        {appointment?.doctor?.firstname}{" "}
                        {appointment?.doctor?.lastname}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{appointment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog
                          open={
                            appointment.id === appointmentId
                              ? editDialogOpen
                              : false
                          }
                          onOpenChange={setEditDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              disabled={appointment.status !== "PENDING"}
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => {
                                setSelectedAppointment(appointment as any);
                                setEditDialogOpen(true);
                                setAppointmentId(appointment.id);
                              }}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleEditAppointment}>
                              <DialogHeader>
                                <DialogTitle>Edit Appointment</DialogTitle>
                                <DialogDescription>
                                  Make changes to the appointment here.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit-date"
                                    className="text-right"
                                  >
                                    Date
                                  </Label>
                                  <Input
                                    id="edit-date"
                                    name="date"
                                    type="date"
                                    className="col-span-3"
                                    defaultValue={format(
                                      appointment.appointmentTime,
                                      "yyyy-MM-dd",
                                    )}
                                    required
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit-time"
                                    className="text-right"
                                  >
                                    Time
                                  </Label>
                                  <Input
                                    id="edit-time"
                                    name="time"
                                    type="time"
                                    className="col-span-3"
                                    defaultValue={format(
                                      appointment.appointmentTime,
                                      "HH:mm",
                                    )}
                                    required
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit-description"
                                    className="text-right"
                                  >
                                    Description
                                  </Label>
                                  <Input
                                    id="edit-description"
                                    name="description"
                                    className="col-span-3"
                                    defaultValue={
                                      appointment.appointmentDescription as string
                                    }
                                    required
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit-doctor"
                                    className="text-right"
                                  >
                                    Doctor
                                  </Label>
                                  <Select
                                    name="doctor"
                                    required
                                    defaultValue={
                                      appointment.doctorId as string
                                    }
                                  >
                                    <SelectTrigger className="w-[250px]">
                                      <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          List of doctors
                                        </SelectLabel>
                                        {activeDoctor?.map((doctor) => (
                                          <SelectItem
                                            key={doctor.id}
                                            value={doctor.id}
                                          >
                                            {doctor.firstname} {doctor.lastname}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={appointment.status !== "PENDING"}
                            >
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the appointment and remove it
                                from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex items-center">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={handleDelete}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card
        className={`flex h-[400px] w-full flex-col items-center justify-center gap-20 ${appointment?.length === 0 ? "" : "hidden"}`}
      >
        <CardHeader className="flex h-[400px] w-full flex-col items-center justify-center gap-20">
          <CardTitle className="text-2xl">No Appointments Scheduled</CardTitle>
          <CardDescription>
            You currently have no appointments. Please check back later or
            create a new appointment.
          </CardDescription>
          <CardContent>
            <Button onClick={() => setAddDialogOpen(true)}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Add Appointment
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Page;
