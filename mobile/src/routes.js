import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "DevMaps"
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          screen: "Perfil no Github"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#7D40E7"
        },
        headerTintColor: "#FFF",
        headerBackTitleVisible: false
      }
    }
  )
);

export default Routes;
