package com.exploreapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import io.invertase.notifee.NotifeeApiModule;


public class CustomActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "custom-component";
  }
}