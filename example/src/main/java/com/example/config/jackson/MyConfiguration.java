package com.example.config.jackson;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

@Configuration
public class MyConfiguration {

	/**
	 * 当springboot版本是2.0.9以上配置fastjson不生效解决如下：
	 * 
	 * @return
	 */
	@Bean
	public HttpMessageConverters customConverters() {
		FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
		// 创建配置类
		FastJsonConfig config = new FastJsonConfig();
		config.setSerializerFeatures(SerializerFeature.WriteNullListAsEmpty, SerializerFeature.WriteMapNullValue,
				SerializerFeature.WriteNullStringAsEmpty);

		// 此处是全局处理方式
		config.setDateFormat("yyyy-MM-dd HH:mm:ss");
		config.setCharset(Charset.forName("UTF-8"));
		fastConverter.setFastJsonConfig(config);

		List<MediaType> supportedMediaTypes = new ArrayList<>();
		supportedMediaTypes.add(MediaType.ALL);
		fastConverter.setSupportedMediaTypes(supportedMediaTypes);
		// 支持text 转string
		StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter();
		return new HttpMessageConverters(fastConverter, stringHttpMessageConverter);
	}
}