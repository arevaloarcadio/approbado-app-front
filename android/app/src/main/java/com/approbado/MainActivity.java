package com.approbado;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.community.facebooklogin.FacebookLogin;
import java.util.ArrayList;
import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.capacitorjs.plugins.keyboard.KeyboardPlugin;
import com.capacitorjs.plugins.haptics.HapticsPlugin;
import com.capacitorjs.plugins.app.AppPlugin;
import com.capacitorjs.plugins.camera.CameraPlugin;
import com.capacitorjs.plugins.clipboard.ClipboardPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(FacebookLogin.class);
            add(ClipboardPlugin.class);
            add(PushNotificationsPlugin.class);
            add(GoogleAuth.class);
            add(CameraPlugin.class);
            add(KeyboardPlugin.class);
            add(HapticsPlugin.class);
            add(AppPlugin.class);
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
        }});
    }
}
