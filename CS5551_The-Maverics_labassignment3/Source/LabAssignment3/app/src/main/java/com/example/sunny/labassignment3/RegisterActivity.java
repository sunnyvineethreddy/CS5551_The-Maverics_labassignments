package com.example.sunny.labassignment3;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;



/**
 * Created by sunny on 2/25/2018.
 */

public class RegisterActivity extends AppCompatActivity {

    EditText _usrName;
    EditText _Fname;
    EditText _Lname;
    EditText _email;
    EditText _password;
    Button _btn_Signup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);


    }

}
