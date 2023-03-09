export const NAME = "STUDENTS";

export enum StudentProperties {
  Id = "id",
  Name = "name",
  Phone = "phone",
  Email = "email",
  Nickname = "nickname",
}

export enum OtherProperties {
  Profile = "profile_picture",
  Major = "major",
  Status = "status",
  Total_Course = "total_course",
}

export const TableHeader = [
  { id: OtherProperties.Profile, name: "" },
  { id: StudentProperties.Name, name: "Name", isSortable: true },
  { id: StudentProperties.Phone, name: "Phone" },
  { id: StudentProperties.Email, name: "Email" },
  {
    id: OtherProperties.Major,
    name: "Major",
    isSortable: true,
    key: "profile",
  },
  {
    id: OtherProperties.Status,
    name: "Status",
    isSortable: true,
    key: "profile",
  },
  { id: OtherProperties.Total_Course, name: "Total Course" },
];

type StatusType = {
  [key: string]: string;
};

export const Status: StatusType = {
  1: "Good",
  2: "Probation",
  3: "Inactive",
  withdrawn: "Withdrawn",
};
