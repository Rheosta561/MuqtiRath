import React, { useEffect, useState } from "react";
import Navbar from "../assets/Navbar";
import CourseCard from "../assets/CourseCard";
import { useParams } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";
import JobCard from "./JobCard";
import HelplineCard from "./HelplineCard";

function Dashboard() {
  const { userId } = useParams();
  const [courses, setCourses] = useState([]); 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`https://muqtirath-wiegnite.onrender.com/recommendations/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        setCourses(data.recommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await fetch(`https://muqtirath-wiegnite.onrender.com/recommendJobs/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job recommendations");
        }
        const data = await response.json();
        setJobs([...data.recommendations.ngos, ...data.recommendations.orgs]);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchRecommendations();
    fetchJobs();
  }, [userId]);

  return (
    <div>
      <Navbar Id={userId} />
      <br /><br />
      <GoogleTranslate />

      <div className="h-fit w-screen p-2 mt-4">
        <div className="border h-full rounded-lg  p-2 bg-zinc-50 bg-center bg-cover">
          <h1 className="text-5xl font-semibold">Recommended Skills</h1>
          <p className="text-sm text-zinc-700">Specially Crafted Skills for You</p>
          <p className="text-sm text-zinc-600">Curated with love</p>
          <hr className="border mt-2 border-zinc-700 rounded-lg" />

          {loading ? (
            <p className="text-center text-lg font-semibold mt-5">Loading recommendations...</p>
          ) : error ? (
            <p className="text-center text-red-500 font-semibold mt-5">{error}</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-lg mt-5">No recommendations available.</p>
          ) : (
            <div className="h-fit w-full mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  title={course.name}
                  description={course.desc}
                  image={course.image || "https://via.placeholder.com/300"} 
                  link={course.link}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border p-2 mt-2 rounded-lg bg-gray-100">
          <h1 className="text-5xl font-semibold">Jobs</h1>
          <h5>Powered by <span className="font-semibold">Mukti<span className="text-pink-900">Rath</span></span></h5>
          <div className="border w-full mt-2 rounded-lg p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobsLoading ? (
              <p className="text-center text-lg font-semibold mt-5">Loading job recommendations...</p>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job._id} job={job.jobs[0]} organizer={job.name} phone={job.contact || "N/A"} />
              ))
            ) : (
              <p>No job recommendations available.</p>
            )}
          </div>
        </div>

        <div className="border p-2 mt-2 rounded-lg bg-gray-100">
          <h1 className="text-5xl font-semibold">HelpLines</h1>
          <h5>Researched by <span className="font-semibold">Mukti<span className="text-pink-900">Rath</span></span></h5>
          <div className="border w-full mt-2 rounded-lg p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <HelplineCard name="Women’s Helpline (All India)" desc="24/7 helpline for women in distress, including domestic violence and harassment." phone="1091" />
            <HelplineCard name="National Commission for Women (NCW)" desc="Provides legal aid and grievance redressal for women facing discrimination or violence." phone="7827170170" />
            <HelplineCard name="Sakhi One-Stop Centre" desc="Supports survivors of gender-based violence with counseling, legal aid, and shelter." phone="181" />
            <HelplineCard name="Childline India (For Girls & Children)" desc="24/7 helpline for children in distress, including abuse and trafficking cases." phone="1098" />
            <HelplineCard name="Delhi Commission for Women (DCW)" desc="Helpline for women in Delhi facing violence, abuse, or legal issues." phone="181" />
            <HelplineCard name="Police Emergency Helpline" desc="For immediate police assistance in cases of violence or harassment." phone="112" />
            <HelplineCard name="Shakti Shalini" desc="Offers shelter, legal aid, and emotional support for domestic violence survivors." phone="10920" />
            <HelplineCard name="Snehi Mental Health Support" desc="Counseling services for women facing mental health issues due to abuse or trauma." phone="9582208181" />
            <HelplineCard name="Aks Foundation" desc="Support for survivors of domestic violence, stalking, and sexual harassment." phone="9999999559" />
            <HelplineCard name="My Choices Foundation" desc="Dedicated to preventing human trafficking and domestic violence against women." phone="18002100188" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;