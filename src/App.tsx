import { InfoBlockComponent, type InfoBlock } from "./components/InformationBlock"

function App() {

	// Create info block
	const aboutMeBlock: InfoBlock = {
		headerText: "ABOUT ME",
		bodyText: "Some example text here",
		hyperLink: "https://www.google.com"
	}

	const aboutMyWork: InfoBlock = {
		headerText: "MY WORK",
		bodyText: "Purus ut faucibus pulvlnar elementum",
		hyperLink: "https://www.google.com"
	}

  return (
    <>
			<title>My Portfolio</title>
			<InfoBlockComponent {...aboutMeBlock} />
			<InfoBlockComponent {...aboutMyWork} />
    </>
  )
}

export default App
