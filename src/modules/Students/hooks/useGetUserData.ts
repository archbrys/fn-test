import { useCallback, useEffect, useState } from "react";
import { STATUS } from "../../../common/Constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCourses } from "../../Course/actions";
import { ICourse } from "../../Course/interface";
import { courseState } from "../../Course/reducer";
import { fetchProfiles } from "../../Profile/actions";
import { IProfile, IProfileStatus } from "../../Profile/interface";
import { profileState } from "../../Profile/reducer";
import { fetchStudents } from "../actions";
import { Status } from "../constants";
import { IStudent } from "../interface";
import { studentState } from "../reducer";

interface IUserData extends IStudent {
  courses: ICourse[];
  profiles: IProfile[];
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
    setLoading(true);

    const newStudents = students.map((student: IStudent) => {
      return {
        ...student,
        courses: sanitizeDuplicate(
          courses.filter(
            (course: ICourse) => `user_${student.id}` === course.user_id,
          ),
        ),
        profiles: profiles.filter(
          (profile: IProfile) => `user_${student.id}` === profile.user_id,
        ),
      };
    });
    setLoading(false);
    setData(newStudents);
  }, [students, profiles, courses]);

  const getStudent = () => {
    if (id) {
      console.log(data, id);
      const _student = data.find((value) => {
        return value.id === id;
      });

      setStudent(_student);
    }
  };

  const getStatusValue = (profiles: IProfile[] | undefined) => {
    if (!profiles) return "";
    let latestStatus =
      Array.isArray(profiles) && !profiles.length
        ? []
        : profiles[0].status || [];

    let statusValue = !latestStatus.length
      ? "withdrawn"
      : latestStatus.reduce((a: IProfileStatus, b: IProfileStatus) =>
          a.date > b.date ? a : b,
        ).type;

    return Status[statusValue];
  };

  useEffect(() => {
    handleFetchStudents();
    handleFetchProfiles();
    handleFetchCourses();
  }, []);

  useEffect(() => {
    getData();
  }, [students, profiles, courses]);

  useEffect(() => {
    getStudent();
  }, [data]);

  return {
    data,
    loading,
    student,
    getStatusValue,
  };
};
