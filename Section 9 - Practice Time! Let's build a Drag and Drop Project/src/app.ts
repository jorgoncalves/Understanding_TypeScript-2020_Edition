// Project State Management

class ProjectState {
  private listeners: any[] = [];
  private project: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople
    };
    this.project.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.project.slice());
    }
  }
  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProjectState();
    return this.instance;
  }
}

const projectState = ProjectState.getInstance();

// Validation

interface Validateble {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validateble) {
  let isValid = true;
  if (validatableInput.required)
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;

  if (
    // != null porque 0 é falsy
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
  )
    isValid =
      isValid &&
      validatableInput.value.trim().length > validatableInput.minLength;
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
  )
    isValid =
      isValid &&
      validatableInput.value.trim().length < validatableInput.maxLength;
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === 'number'
  )
    isValid = isValid && validatableInput.value > validatableInput.min;
  if (
    // != null porque 0 é falsy
    validatableInput.max != null &&
    typeof validatableInput.value === 'number'
  )
    isValid = isValid && validatableInput.value < validatableInput.max;
  return isValid;
}

// autobind decorator

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const ajtDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return ajtDescriptor;
}
// ProjectList class
class ProjectList {
  templateELement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any;
  constructor(private type: 'active' | 'finished') {
    this.templateELement = document.getElementById(
      'project-list'
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;
    this.assignedProjects = [];

    //atenção! importedNode é do tipo fragment
    const importedNode = document.importNode(
      //.content passa um referencia ao conteudo da template
      this.templateELement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProject();
    });

    this.attach();
    this.renderContent();
  }

  private renderProject() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    ) as HTMLUListElement;

    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// ProjectInput class
class ProjectInput {
  templateELement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    this.templateELement = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    //atenção! importedNode é do tipo fragment
    const importedNode = document.importNode(
      //.content passa um referencia ao conteudo da template
      this.templateELement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // void é exclusivo de funções e informa o TS que há pelo menos um ramo que não devolve valores.
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validateble = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validateble = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validateble = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalied input, please try again!');
      return;
    }

    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInput();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
