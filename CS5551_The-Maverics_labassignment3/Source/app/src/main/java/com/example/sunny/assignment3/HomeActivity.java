package com.example.sunny.assignment3;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.facebook.login.LoginManager;

/**
 * Created by sunny on 2/27/2018.
 */

public class HomeActivity extends AppCompatActivity {
    Button logout,gotoapi;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        logout=(Button)findViewById(R.id.btn_logout);
        gotoapi=(Button)findViewById(R.id.btn_api);

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LoginManager.getInstance().logOut();
                startActivity(new Intent(HomeActivity.this, LoginActivity.class));
            }
        });

        gotoapi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(HomeActivity.this, LauncherActivity.class));
            }
        });
    }
    
}
