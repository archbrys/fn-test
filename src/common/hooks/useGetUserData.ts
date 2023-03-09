import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCourses } from "../../modules/Course/actions";
import { ICourse } from "../../modules/Course/interface";
import { courseState } from "../../modules/Course/reducer";
import { fetchProfiles } from "../../modules/Profile/actions";
import { IProfile } from "../../modules/Profile/interface";
import { profileState } from "../../modules/Profile/reducer";
import { fetchStudents, getStatusValue } from "../../modules/Students/actions";
import { IStudent } from "../../modules/Students/interface";
import { studentState } from "../../modules/Students/reducer";
import { STATUS } from "../constants";

interface IUserData extends IStudent {
  courses: ICourse[];
  profile: IProfile | undefined;
}

interface InitialValue {
  id?: number | string | undefined;
}

export const useGetStudentData = (initialValue: InitialValue = {}) => {
  const { id } = initialValue;
  const dispatch = useAppDispatch();
  const { students, status: studentStatus } = useAppSelector(studentState);
  const { profiles, status: profilesStatus } = useAppSelector(profileState);
  const { courses, status: coursesStatus } = useAppSelector(courseState);

  const [student, setStudent] = useState<IUserData | undefined>(undefined);
  const [data, setData] = useState<IUserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const handleFetchStudents = useCallback((): void => {
    if (students.length !== 0 && studentStatus === STATUS.Idle) return;
    dispatch(fetchStudents());
  }, [students, studentStatus, dispatch]);

  const handleFetchProfiles = useCallback((): void => {
    if (profiles.length !== 0 && profilesStatus === STATUS.Idle) return;
    dispatch(fetchProfiles());
  }, [profiles, profilesStatus, dispatch]);

  const handleFetchCourses = useCallback((): void => {
    if (courses.length !== 0 && coursesStatus === STATUS.Idle) return;
    dispatch(fetchCourses());
  }, [courses, coursesStatus, dispatch]);

  const sanitizeDuplicate = (courses: ICourse[]) => {
    const uniqueCourses = courses.reduce(
      (accumulator: ICourse[], current: ICourse) => {
        const hasDuplicate = accumulator.find(
          (course: ICourse) =>
            course.course_selection === current.course_selection &&
            course.semester_code === current.semester_code,
        );
        if (!hasDuplicate) {
          accumulator.push(current);
        }
        return accumulator;
      },
      [],
    );

    return uniqueCourses;
  };

  const getData = useCallback(() => {
    const newStudents = students.map((student: IStudent) => {
      return {
        ...student,
        courses: sanitizeDuplicate(
          courses.filter(
            (course: ICourse) => `user_${student.id}` === course.user_id,
          ),
        ),
        profile: profiles.find(
          (profile: IProfile) => `user_${student.id}` === profile.user_id,
        ),
      };
    });

    if (newStudents.length !== 0) {
      setLoading(false);
      setData(newStudents);
    }
  }, [students, profiles, courses]);

  const getStudent = () => {
    if (id) {
      const _student = data.find((value) => {
        return value.id === id;
      });

      setStudent(_student);
    }
  };

  const fuzzySearch = useCallback(() => {
    if (filter === "") return data;

    return data.filter(({ name, phone, email, profile }) => {
      if (name.toLowerCase().includes(filter.toLowerCase())) return true;
      if (phone.toLowerCase().includes(filter.toLowerCase())) return true;
      if (email.toLowerCase().includes(filter.toLowerCase())) return true;
      if (profile?.major.toLowerCase().includes(filter.toLowerCase()))
        return true;

      const status = getStatusValue(profile);
      if (status.toLowerCase().includes(filter.toLowerCase())) return true;

      return false;
    });
  }, [filter, data]);

  useEffect(() => {
    setLoading(true);
    handleFetchStudents();
    handleFetchProfiles();
    handleFetchCourses();
  }, []);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [students, profiles, courses]);

  useEffect(() => {
    getStudent();
  }, [data]);

  return {
    data: fuzzySearch(),
    loading,
    student,
    setFilter,
  };
};
