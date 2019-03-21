export const formElements = {
  user: {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      label: 'Email',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
          // eslint-disable-next-line
          test: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
      },
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Hasło',
      },
      label: 'Hasło',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
          minLength: 4,
          maxLength: 20,
        },
      },
      touched: false,
    },
    typeOfUserId: {
      elementGroup: 'typesOfUser',
      elementType: 'input',
      elementConfig: {
        type: 'checkbox',
        placeholder: '',
        checked: false,
      },
      label: '',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    firstName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Imię',
      },
      label: 'Imię',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
          minLength: 3,
          maxLength: 20,
        },
      },
      touched: false,
    },
    lastName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Nazwisko',
      },
      label: 'Nazwisko',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
          minLength: 3,
          maxLength: 20,
        },
      },
      touched: false,
    },
    secondName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Drugie imię',
      },
      label: 'Drugie imię',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Tytuł',
      },
      label: 'Tytuł',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    pesel: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Pesel',
      },
      label: 'Pesel',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    fatherName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Imię ojca',
      },
      label: 'Imię ojca',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    motherName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Imię matki',
      },
      label: 'Imię matki',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    sex: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Płeć',
      },
      label: 'Płeć',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    maidenName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Nazwisko panieńskie',
      },
      label: 'Nazwisko panieńskie',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    citizenship: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Obywatelstwo',
      },
      label: 'Obywatelstwo',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    nationality: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Narodowość',
      },
      label: 'Narodowość',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    placeOfBirth: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Miejsce urodzenia',
      },
      label: 'Miejsce urodzenia',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    voivodeshipOfBirth: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Województwo urodzenia',
      },
      label: 'Województwo urodzenia',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    workEmail: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Poczta robocza',
      },
      label: 'Poczta robocza',
      value: '',
      validation: {
        valid: true,
      },
      touched: false,
    },
    address: {
      voivodeship: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Województwo',
        },
        label: 'Województwo',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Miasto',
        },
        label: 'Miasto',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ulica',
        },
        label: 'Ulica',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Kod pocztowy',
        },
        label: 'Kod pocztowy',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      postOffice: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Poczta',
        },
        label: 'Poczta',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      phoneNumer: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Numer telefonu',
        },
        label: 'Numer telefonu',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      isMailingAddress: {
        elementType: 'input',
        elementConfig: {
          type: 'checkbox',
          placeholder: '',
          checked: true,
        },
        label: 'Użyj jako adres korespondencji',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
    },
    highSchool: {
      completedHighSchool: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ukończona szkoła średnia',
        },
        label: 'Ukończona szkoła średnia',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      highSchoolCompletionYear: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Rok ukończenia szkoły średniej',
        },
        label: 'Rok ukończenia szkoły średniej',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      highSchoolCompletionCity: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Miejscowość ukończenia szkoły średniej',
        },
        label: 'Miejscowość ukończenia szkoły średniej',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      highSchoolLaureate: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Laureat ukończenia szkoły średniej',
        },
        label: 'Laureat ukończenia szkoły średniej',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      contestLaureate: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Laureat olimpiad',
        },
        label: 'Laureat olimpiad',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
    },
    education: {
      fieldOfStudyId: {
        elementType: 'select',
        elementConfig: {
          options: [],
          placeholder: 'Kierunek studiów',
        },
        label: 'Kierunek studiów',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      specializationId: {
        elementType: 'select',
        elementConfig: {
          options: [],
          placeholder: 'Specjalizacja',
        },
        label: 'Specjalizacja',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      currentSemester: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Aktualny semestr',
        },
        label: 'Aktualny semestr',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
      currentAcademicYear: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Aktualny rok akademicki',
        },
        label: 'Aktualny rok akademicki',
        value: '',
        validation: {
          valid: true,
        },
        touched: false,
      },
    },
  },
  mark: {
    semesterNumber: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
          {
            value: '4',
            label: '4',
          },
          {
            value: '5',
            label: '5',
          },
          {
            value: '6',
            label: '6',
          },
        ],
        placeholder: 'Semestr',
      },
      label: 'Semestr',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    subjectId: {
      elementType: 'select',
      elementConfig: {
        options: [],
        placeholder: 'Przedmiot',
      },
      label: 'Przedmiot',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    valueNumber: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Ocena',
      },
      label: 'Ocena',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    valueTerm: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'niezaliczony',
            label: 'Niezaliczony',
          },
          {
            value: 'zaliczony',
            label: 'Zaliczony',
          },
        ],
        placeholder: 'Ocena',
      },
      label: 'Ocena',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    createdDate: {
      elementType: 'input',
      elementConfig: {
        type: 'date',
        placeholder: 'Data dodania',
      },
      label: 'Data dodania',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    termNumber: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Numer terminu',
      },
      label: 'Numer terminu',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    teacherId: {
      elementType: 'select',
      elementConfig: {
        options: [],
        placeholder: 'Nauczyciel',
      },
      label: 'Nauczyciel',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    typeOfSubject: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'ćwiczenia',
            label: 'Ćwiczenia',
          },
          {
            value: 'labolatorium',
            label: 'Labolatorium',
          },
          {
            value: 'wykład',
            label: 'Wykład',
          },
        ],
        placeholder: 'Typ przedmiotu',
      },
      label: 'Typ przedmiotu',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
    typeOfTerm: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'zaliczenie bez oceny',
            label: 'Zaliczenie bez oceny',
          },
          {
            value: 'zaliczenie z oceną',
            label: 'Zaliczenie z oceną',
          },
          {
            value: 'egzamin',
            label: 'Egzamin',
          },
        ],
        placeholder: 'Typ zaliczenia',
      },
      label: 'Typ zaliczenia',
      value: '',
      validation: {
        valid: false,
        rules: {
          required: true,
        },
      },
      touched: false,
    },
  },
};
