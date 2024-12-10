type Category = {
  id: string;
  name: string;
  icon: {
    url: string;
  };
};

type BusinessList = {
  about: string;
  address: string;
  category: {
    name: string;
  };
  contactPerson: string;
  email: string;
  images: {
    url: string;
  }[];
  id: string;
  name: string;
};

type DescopeProfile = {
  [key: string]: string;
};
