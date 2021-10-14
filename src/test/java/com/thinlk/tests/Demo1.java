package com.thinlk.tests;

import com.thinlk.report.Listener;
import com.thinlk.report.Files;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.Properties;


/**
 * @author: lp_jo
 * @date: 10/12/2021
 * @description:
 */
@Listeners(Listener.class)
public class Demo1 {
    @Test
    public void webLoginCarlogin()
    {
        //selenium
        Assert.fail();
        System.out.println("webLoginCarlogin");
    }

    @Test
    public void Mobilelogincarloan()
    {
        //Apium
        System.out.println("Mobilelogincarloan");
    }

    @Test
    public void LoginAPIcarLoan()
    {
        //Rest API Automation
        System.out.println("LoginAPIcarLoan");
    }

    @Test
    public void skipTest()
    {
        throw new SkipException("Skip the test");
    }

    @BeforeMethod
    public void beforeMethodTest()
    {
        //selenium
        System.out.println("beforeMethodTest in Demo2 class");
    }

    @AfterMethod
    public void AfterMethodTest()
    {
        //selenium
        System.out.println("@AfterMethod in Demo2 class");
    }
}
