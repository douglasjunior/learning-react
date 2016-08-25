package com.github.douglasjunior.javatodoapi;

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Arrays;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author douglas
 */
@WebFilter(filterName = "CORSFilter", urlPatterns = {"/rest/*"})
public class CORSFilter implements Filter {

    private final String[] ALLOW_ORIGINS = {"http://localhost:8081", "com.saframax.SM4Android"};
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("CORSFilter");
        HttpServletResponse res = (HttpServletResponse) response;
        HttpServletRequest req = (HttpServletRequest) request;
        
        String origin = req.getHeader("Origin");
        
        if (Arrays.binarySearch(ALLOW_ORIGINS, origin) < 0)
            origin = "";
        
        res.addHeader("Access-Control-Allow-Origin", origin);
        res.addHeader("Access-Control-Allow-Credentials", "true");
        if (req.getMethod().equals("OPTIONS")) {
            res.addHeader("Access-Control-Allow-Headers", req.getHeader("Access-Control-Request-Headers"));
            res.addHeader("Access-Control-Allow-Methods", req.getHeader("Access-Control-Request-Method"));
        } else {
            System.out.println("Session: " + req.getSession().getId());
            proceed(req, res, chain);
        }
    }

    private void proceed(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(req, res);
    }

    @Override
    public void destroy() {
    }
}
