require 'selenium-webdriver'
require 'rspec/expectations'
include RSpec::Matchers

def setup
  caps    = Selenium::WebDriver::Remote::Capabilities.send("firefox")
  @driver = Selenium::WebDriver.for(:remote, url: "http://0.0.0.0:4444/wd/hub", desired_capabilities: caps)
end

def teardown
  @driver.quit
end

def run
  setup
  yield
  teardown
end

run do
  @driver.get 'http://yogalates.dk'
  expect(@driver.title).to eql "Yogalates"
  # @driver.save_screenshot('docker_image.png')
end
