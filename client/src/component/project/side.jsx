import { FontAwsome } from "../common/fontawsome";

export default function Side({ project = {} }) {
  console.log(project);
  const fnc = {
    close: (event) => {
      event.preventDefault();
    },
    edit: (event) => {
      event.preventDefault();
    },
   
  }
 if(!!project)
  return (
    <div className="project-side">
      <div className="menu-bar">
        <button className="memo">
          <FontAwsome data={"fa-plus"} />
        </button>
        <button className="editBtn" onClick={fnc.edit}>
          <FontAwsome data={"fa-wrench"} />
        </button>
        <button className="closeBtn" onClick={fnc.close}></button>
      </div>
      <ul className="project-content">
        <li className="subject">
          <b>Project</b>
          <p className="subject">
            {project.subject}
          </p>
        </li>
        <li className="goals">
          <b>Goal</b>
          <p>
            {project.content}
          </p>
        </li>
        <li className="des">
          <p>
            {project.description}
          </p>
        </li>
      </ul>
    </div>
  );
}
