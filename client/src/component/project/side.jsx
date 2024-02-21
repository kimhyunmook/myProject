export default function Side({ project = [] }) {
  console.log(project);
  return (
    <aside className="project-side">
      <ul>
        {project.map((el, index) => {
          return (
            <li key={`${el.subject}_${index}`}>
              <a href="#">{el.subject}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
