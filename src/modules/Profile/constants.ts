export const NAME = "PROFILE";

export enum CourseProperties {
  Semester_Code = "semester_code",
  Course_Name = "course_name",
  Course_Selection = "course_selection",
  Course_Fee = "course_fee",
}

export const ProfileTableHeader = [
  { id: CourseProperties.Semester_Code, name: "Semester Code" },
  { id: CourseProperties.Course_Name, name: "Course Name", isSortable: true },
  { id: CourseProperties.Course_Selection, name: "Course Selection" },
  { id: CourseProperties.Course_Fee, name: "Course Fee" },
];
