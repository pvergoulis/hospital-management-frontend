import { getAllAppointments } from "../../../services/appointmentApi";
import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { type AppointmentDoctorType } from "../../../types/appointmentTypes";

const AdminAppointmentPage = () => {
  const [appointments, setAppointments] = useState<AppointmentDoctorType[]>([]);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAppointments();
        console.log(data);
        setAppointments(
          data.map((appt) => ({
            ...appt,
            doctorName:
              appt.doctor?.firstname && appt.doctor?.lastname
                ? `${appt.doctor.firstname} ${appt.doctor.lastname}`.trim()
                : "N/A",

            userName:
              appt.user?.firstname && appt.user?.lastname
                ? `${appt.user.firstname} ${appt.user.lastname}`.trim()
                : "N/A",
          }))
        );

        console.log("App : ", appointments);
      } catch (error) {
        console.error("Error fetching all appointments:", error);
      }
    };
    fetchAppointments();
  }, []);
  useEffect(() => {
    console.log("Appointments updated:", appointments);
  }, [appointments]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params: any) => {
        const dateValue = params.row.date;
        if (!dateValue) return "—";
        const dateObj = new Date(dateValue);
        return isNaN(dateObj.getTime()) ? "—" : dateObj.toLocaleDateString();
      },
    },
    { field: "timeSlot", headerName: "Time Slot", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },

    // Doctor full name
    { field: "doctorName", headerName: "Doctor", flex: 1 },
    { field: "userName", headerName: "User", flex: 1 },
  ];
  return (
    <>
      <div className="mt-16 w-[90%] mx-auto min-h-[64vh]">
        <DataGrid
          rows={appointments}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          pageSizeOptions={[5, 8, 10, 20]}
          pagination
        />
      </div>
    </>
  );
};

export default AdminAppointmentPage;
