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
import {
  format,
  addDays,
  isWithinInterval,
  parse,
  startOfDay,
  isAfter,
  isBefore,
} from "date-fns";
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
import html2canvas from "html2canvas";

const Page = () => {
  const { toast } = useToast();
  const [appointmentId, setAppointmentId] = useState<string>();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { data: appointment, refetch } =
    api.appointment.getAllAppointment.useQuery({});
  const { data: activeDoctor } = api.doctor.getActiveDoctor.useQuery();
  const { data: patientLogin } = api.patient.getPatientLogin.useQuery({});

  const updateDoctors = api.appointment.AddAppointment.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Success",
        description: "Appointment added successfully.",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add appointment.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const deleteAppointment = api.appointment.deleteAppointment.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Success",
        description: "Delete appointment updated successfully.",
        duration: 1000,
      });
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      formattedDate: format(date, "MMMM d, yyyy"),
      formattedTime: format(date, "h:mm a"),
    };
  };

  const isValidAppointmentTime = (date: Date, time: string) => {
    const appointmentDateTime = parse(time, "HH:mm", date);
    return isWithinInterval(appointmentDateTime, {
      start: parse("07:00", "HH:mm", date),
      end: parse("16:00", "HH:mm", date),
    });
  };

  const isValidAppointmentDate = (date: Date) => {
    const currentDate = startOfDay(new Date());
    const maxDate = addDays(currentDate, 30);
    return (
      (isAfter(date, currentDate) ||
        date.getTime() === currentDate.getTime()) &&
      (isBefore(date, maxDate) || date.getTime() === maxDate.getTime())
    );
  };

  const handleAddAppointment = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const selectedDate = new Date(`${form.date.value}T${form.time.value}`);

    if (!isValidAppointmentTime(selectedDate, form.time.value)) {
      toast({
        title: "Invalid Time",
        description: "Appointments are only available from 7 AM to 4 PM.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidAppointmentDate(selectedDate)) {
      toast({
        title: "Invalid Date",
        description:
          "Appointments can only be scheduled up to 30 days in advance.",
        variant: "destructive",
      });
      return;
    }

    const newAppointment = {
      date: selectedDate,
      patientId: patientLogin?.id as string,
      description: form.description.value,
      doctorId: form.doctor.value,
    };

    const dateStart = new Date(selectedDate);
    dateStart.setHours(0, 0, 0, 0);
    const dateEnd = new Date(selectedDate);
    dateEnd.setHours(23, 59, 59, 999);

    const appointmentsOnDate =
      appointment?.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentTime);
        return (
          appointment.doctorId === newAppointment.doctorId &&
          appointmentDate >= dateStart &&
          appointmentDate <= dateEnd
        );
      }) || [];

    if (appointmentsOnDate.length >= 10) {
      toast({
        description: "Appointments for selected date are fully booked",
        variant: "destructive",
      });
      return;
    }

    await updateDoctors.mutateAsync(newAppointment);
    setAddDialogOpen(false);
  };

  const handleEditAppointment = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const selectedDate = new Date(`${form.date.value}T${form.time.value}`);

    if (!isValidAppointmentTime(selectedDate, form.time.value)) {
      toast({
        title: "Invalid Time",
        description: "Appointments are only available from 7 AM to 4 PM.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidAppointmentDate(selectedDate)) {
      toast({
        title: "Invalid Date",
        description:
          "Appointments can only be scheduled up to 30 days in advance.",
        variant: "destructive",
      });
      return;
    }

    const newAppointment = {
      id: appointmentId,
      date: selectedDate,
      patientId: patientLogin?.id as string,
      description: form.description.value,
      doctorId: form.doctor.value,
    };

    if (appointment) {
      await updateDoctors.mutateAsync(newAppointment);
    }
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (appointment) {
      await deleteAppointment.mutateAsync({ id: appointmentId as string });
    }
  };

  const generateAppointmentSlip = (appointment: any) => {
    const slipContainer = document.createElement("div");
    slipContainer.style.padding = "20px";
    slipContainer.style.border = "1px solid #ddd";
    slipContainer.style.width = "300px";
    slipContainer.style.backgroundColor = "#fff";
    slipContainer.innerHTML = `
    <h2 style="text-align: center; font-weight: 800; margin: 10px 0;">ZILMAR CLINIC</h2>
    <h2 style=" text-align: center; margin: 20px 0;">Appointment Slip</h2>
    <p><strong>Appointment ID:</strong> ${appointment.id}</p>
    <p><strong>Patient Name:</strong> ${appointment.patient.firstname} ${appointment.patient.lastname}</p>
    <p><strong>Doctor:</strong> ${appointment.doctor.firstname} ${appointment.doctor.lastname} (${appointment.doctor.specialty})</p>
    <p><strong>Illness:</strong> ${appointment.appointmentDescription}</p>
    <p><strong>Date - Time:</strong> ${new Date(appointment.appointmentTime).toLocaleString()}</p>
  `;
    document.body.appendChild(slipContainer);

    html2canvas(slipContainer).then((canvas: any) => {
      const link = document.createElement("a");
      link.download = `Appointment_Slip_${appointment.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      document.body.removeChild(slipContainer); // Clean up the temporary container
    });
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
                      Illness
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
                  <Button type="submit" disabled={updateDoctors.isPending}>
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
                  <TableHead>Illness</TableHead>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-start">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointment?.map((appointment) => {
                  const { formattedDate, formattedTime } = formatDate(
                    appointment.appointmentTime as any,
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
                      <TableCell className="flex items-center justify-start gap-3 text-right">
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
                        <Button
                          className={` ${appointment.status === "APPROVED" ? "" : "hidden"} bg-[#3b3b3b]`}
                          onClick={() => generateAppointmentSlip(appointment)}
                        >
                          Generate Slip
                        </Button>
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
